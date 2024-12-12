from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.home, name='home'),
    path('blog/<int:pk>/', views.blog_detail, name='blog_detail'),
    path('user_board/', views.user_board, name='user_board'),
    path('add_blog/', views.add_blog, name='add_blog'),
    path('update_blog/<int:pk>/', views.update_blog, name='update_blog'),
    path('delete_blog/<int:pk>/', views.delete_blog, name='delete_blog'),
    path('signup/', views.signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='home'), name='logout'),
]

