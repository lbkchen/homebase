from django.http import JsonResponse, HttpResponse

# Create your views here.


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


# Reddit


def reddit_fmf(request):
    return JsonResponse("this")