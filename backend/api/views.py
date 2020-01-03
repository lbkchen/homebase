import praw
import environ
import re

from django.http import JsonResponse, HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


# Reddit

def reddit_posts(request):
    """
    Get all interesting or relevant posts to me.

    TODO (jank): Not a model, so no serializer for this.

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
        r'\bj\s?crew\b',  # JCrew
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

    response = {
        "sections": [
            fmf_section_serialized,
        ]
    }
    return JsonResponse(response)
