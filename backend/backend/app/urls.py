from django.urls import path
from . import views

urlpatterns = [
    path('', views.NoteList.as_view(), name = 'index'),
    path('create/', views.NoteCreate.as_view(), name = 'note-create'),
    path('signup/', views.Signup.as_view(), name = 'signup'),
    path('login/', views.LoginView.as_view(), name = 'login'),
    path('logout/', views.LogoutView.as_view(), name = 'logout'),
    path('<int:pk>/', views.NoteDetails.as_view(), name = 'note-details'),
]