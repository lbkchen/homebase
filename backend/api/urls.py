from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('journals', views.journal_entries, name='journals'),
    path('reddit', views.reddit_posts, name='reddit')
]
