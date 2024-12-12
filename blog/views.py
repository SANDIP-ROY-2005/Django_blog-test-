from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from .models import Blog
from .forms import BlogForm

def home(request):
    blogs = Blog.objects.all().order_by('-created_at')
    return render(request, 'home.html', {'blogs': blogs})

def blog_detail(request, pk):
    blog = get_object_or_404(Blog, pk=pk)
    return render(request, 'blog_detail.html', {'blog': blog})

@login_required
def user_board(request):
    user_blogs = Blog.objects.filter(author=request.user).order_by('-created_at')
    return render(request, 'user_board.html', {'blogs': user_blogs})

@login_required
def add_blog(request):
    if request.method == 'POST':
        form = BlogForm(request.POST, request.FILES)
        if form.is_valid():
            blog = form.save(commit=False)
            blog.author = request.user
            blog.save()
            return redirect('user_board')
    else:
        form = BlogForm()
    return render(request, 'add_blog.html', {'form': form})

@login_required
def update_blog(request, pk):
    blog = get_object_or_404(Blog, pk=pk, author=request.user)
    if request.method == 'POST':
        form = BlogForm(request.POST, request.FILES, instance=blog)
        if form.is_valid():
            form.save()
            return redirect('user_board')
    else:
        form = BlogForm(instance=blog)
    return render(request, 'update_blog.html', {'form': form})

@login_required
def delete_blog(request, pk):
    blog = get_object_or_404(Blog, pk=pk, author=request.user)
    if request.method == 'POST':
        blog.delete()
        return redirect('user_board')
    return render(request, 'delete_blog.html', {'blog': blog})

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

