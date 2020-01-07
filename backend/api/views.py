import praw
import environ
import re
import json

from django.http import JsonResponse, HttpResponse
from django.core import serializers

from .models import JournalEntry


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

# Journal Entries


def journal_entries(request):
    if request.method == "GET":
        return get_journal_entries(request)
    if request.method == "POST":
        return add_journal_entry(request)


def get_journal_entries(request):
    """
    List all journal entries.

    Returns:
      A list of all journal entries
    """
    journals = JournalEntry.objects.all()
    data = serializers.serialize("json", journals)
    return JsonResponse(data)


def add_journal_entry(request):
    """
    Add a journal entry.

    Parameters:
      timestamp (int): When this journal entry should be recorded
      text (string): The text for this journal entry

    Returns:
      None
    """
    body = json.loads(request.body)
    timestamp = body['timestamp']
    text = body['text']
    JournalEntry.objects.create(timestamp=timestamp, text=text)
    return JsonResponse({})

# Reddit


def reddit_posts(request):
    """
    Get all interesting or relevant posts to me.

    TODO (jank): Not a model, so no serializer for this.

    Returns:
    ```
    response = {
      "sections": [
        {
          "name": "Frugal Male Fashion", 
          "posts": [
            {
              "title": "This is a post", 
              "body": "This is the post body", 
              "url": "https://reddit.com/blah"
            }
          ]
        }
      ]
    }
    ```
    """
    env = environ.Env()
    reddit = praw.Reddit(client_id=env('REDDIT_CLIENT_ID'), client_secret=env('REDDIT_CLIENT_SECRET'),
                         password=env('REDDIT_PASSWORD'), user_agent='Personal Scraper (by u/kan-api)',
                         username=env('REDDIT_USERNAME'))

    # Most recent sales from frugalmalefashion
    post_regexes = [
        r'\bbanana\srepublic|BR\b',  # Banana Republic
        r'\bj[\.\s]?crew\b',  # JCrew
        r'\bbeckett?\ssimonon\b',  # Beckett Simonon
    ]

    recent_posts = reddit.subreddit('frugalmalefashion').new(limit=100)
    filtered_posts = [post for post in recent_posts if any(
        bool(re.match(r, post.title, flags=re.IGNORECASE)) for r in post_regexes)
    ]

    def serialize_post(post):
        return {
            "title": post.title,
            "score": post.score,
            "upvote_ratio": post.upvote_ratio,
            "num_comments": post.num_comments,
            "url": post.url,
            "created_utc": post.created_utc
        }

    def serialize_section(name, posts):
        return {
            "name": name,
            "posts": [serialize_post(post) for post in posts]
        }

    fmf_section_serialized = serialize_section(
        "Clothing Sales", filtered_posts)

    data = {
        "sections": [
            fmf_section_serialized,
        ]
    }
    return JsonResponse(data)
