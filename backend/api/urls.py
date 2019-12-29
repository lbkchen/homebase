from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('reddit', views.reddit_posts, name='reddit')
]
