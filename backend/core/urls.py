from django.urls import path
from .views import *

# make urlpatterns for each json file in the data folder
urlpatterns = [
    path("data/<str:filename>/", json_file),
]