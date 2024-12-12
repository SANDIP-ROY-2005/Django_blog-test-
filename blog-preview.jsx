import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Simulated UI components
const Card = ({ children, className }) => (
  <div className={`border rounded-lg shadow-sm p-4 mb-4 ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => <div className="mb-2">{children}</div>;
const CardTitle = ({ children }) => <h2 className="text-xl font-bold">{children}</h2>;
const CardContent = ({ children }) => <div>{children}</div>;

const Button = ({ children, onClick, variant, className, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 rounded transition-colors duration-200 ${
      variant === 'link' ? 'bg-transparent text-blue-500 hover:text-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'
    } ${className}`}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

const Input = ({ type, placeholder, className, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`border rounded px-3 py-2 ${className}`}
    value={value}
    onChange={onChange}
  />
);

const BlogPreview = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulating login process
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const posts = [
    { 
      id: 1, 
      title: "The Future of Artificial Intelligence", 
      content: "Artificial Intelligence is rapidly evolving, transforming industries and our daily lives. From self-driving cars to advanced medical diagnostics, AI is pushing the boundaries of what's possible...", 
      author: "John Doe", 
      created_at: "2023-05-15", 
      category: "Technology",
      image: "https://source.unsplash.com/random/800x600?ai"
    },
    { 
      id: 2, 
      title: "Sustainable Living: Small Changes, Big Impact", 
      content: "Embracing a sustainable lifestyle doesn't have to mean drastic changes. Small, everyday choices can add up to make a significant impact on our environment...", 
      author: "Jane Smith", 
      created_at: "2023-05-16", 
      category: "Lifestyle",
      image: "https://source.unsplash.com/random/800x600?sustainable"
    },
    { 
      id: 3, 
      title: "Hidden Gems: Unexplored Travel Destinations", 
      content: "While popular tourist spots have their charm, there's something magical about discovering lesser-known destinations. These hidden gems offer unique experiences and often more authentic local interactions...", 
      author: "Bob Johnson", 
      created_at: "2023-05-17", 
      category: "Travel",
      image: "https://source.unsplash.com/random/800x600?travel"
    },
  ];

  const categories = ["Technology", "Lifestyle", "Travel", "Food", "Fashion"];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between flex-wrap py-6">
            <div className="flex items-center flex-shrink-0 text-blue-500 mr-6">
              <span className="font-semibold text-xl tracking-tight">My Blog</span>
            </div>
            <div className="block lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center px-3 py-2 border rounded text-blue-500 border-blue-500 hover:text-blue-700 hover:border-blue-700"
              >
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                </svg>
              </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? '' : 'hidden lg:block'}`}>
              <div className="text-sm lg:flex-grow">
                <Button variant="link" className="block mt-4 lg:inline-block lg:mt-0 mr-4" onClick={() => setCurrentPage('home')}>Home</Button>
                <Button variant="link" className="block mt-4 lg:inline-block lg:mt-0 mr-4" onClick={() => setCurrentPage('post_list')}>Blog Posts</Button>
                <Button variant="link" className="block mt-4 lg:inline-block lg:mt-0 mr-4" onClick={() => setCurrentPage('categories')}>Categories</Button>
                <Button variant="link" className="block mt-4 lg:inline-block lg:mt-0 mr-4" onClick={() => setCurrentPage('about')}>About</Button>
                {isLoggedIn && (
                  <>
                    <Button variant="link" className="block mt-4 lg:inline-block lg:mt-0 mr-4" onClick={() => setCurrentPage('add_blog')}>Add Blog</Button>
                    <Button variant="link" className="block mt-4 lg:inline-block lg:mt-0 mr-4" onClick={() => setCurrentPage('user_board')}>My Blogs</Button>
                  </>
                )}
              </div>
              <div>
                {isLoggedIn ? (
                  <Button onClick={handleLogout}>Logout</Button>
                ) : (
                  <>
                    <Button className="mr-2" onClick={() => setCurrentPage('login')}>Login</Button>
                    <Button onClick={() => setCurrentPage('signup')}>Sign Up</Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4 mt-8">
        {currentPage === 'home' && (
          <div>
            <h1 className="text-4xl font-bold mb-8">Discover Inspiring Stories and Insights</h1>
            <p className="mb-8 text-xl">Dive into a world of captivating articles, thought-provoking ideas, and expert perspectives.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-blue-100">
                <CardHeader>
                  <CardTitle>Featured Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {posts.map(post => (
                      <li key={post.id} className="mb-4">
                        <Button variant="link" className="text-lg font-semibold" onClick={() => setCurrentPage(`post_${post.id}`)}>
                          {post.title}
                        </Button>
                        <p className="text-sm text-gray-600">{post.content.substring(0, 100)}...</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-green-100">
                <CardHeader>
                  <CardTitle>Explore Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-4">
                    {categories.map(category => (
                      <li key={category}>
                        <Button variant="link" className="text-lg font-semibold" onClick={() => setCurrentPage('categories')}>
                          {category}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentPage === 'post_list' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
            <div className="mb-8">
              <Input type="text" placeholder="Search posts..." className="w-full md:w-1/2" />
            </div>
            {posts.map(post => (
              <Card key={post.id} className="mb-8">
                <CardHeader>
                  <CardTitle>
                    <Button variant="link" className="p-0 h-auto text-2xl" onClick={() => setCurrentPage(`post_${post.id}`)}>
                      {post.title}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row">
                    <img src={post.image} alt={post.title} className="w-full md:w-1/3 h-48 object-cover mb-4 md:mb-0 md:mr-4" />
                    <div>
                      <p className="mb-4">{post.content.substring(0, 150)}...</p>
                      <p className="text-sm text-gray-500">Author: {post.author} | Created: {post.created_at} | Category: {post.category}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentPage.startsWith('post_') && (
          <div>
            {(() => {
              const postId = parseInt(currentPage.split('_')[1]);
              const post = posts.find(p => p.id === postId);
              if (!post) return <p>Post not found</p>;
              return (
                <article>
                  <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                  <p className="text-gray-500 mb-4">By {post.author} | {post.created_at} | Category: {post.category}</p>
                  <img src={post.image} alt={post.title} className="w-full h-64 object-cover mb-4" />
                  <div className="prose max-w-none mb-8">
                    <p>{post.content}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button onClick={() => setCurrentPage('post_list')}>Back to all posts</Button>
                    <Button variant="link">Share</Button>
                    <Button variant="link">Comment</Button>
                  </div>
                </article>
              );
            })()}
          </div>
        )}

        {currentPage === 'categories' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Categories</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <Card key={category} className="text-center">
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => alert(`Viewing ${category} posts`)}>View Posts</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'about' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">About My Blog</h1>
            <Card>
              <CardContent>
                <p className="mb-4">Welcome to My Blog! This is a platform where we share interesting articles on various topics including technology, lifestyle, travel, food, and fashion.</p>
                <p className="mb-4">Our mission is to provide valuable content to our readers and create a community of knowledge sharing.</p>
                <p>Feel free to explore our posts and join the conversation!</p>
              </CardContent>
            </Card>
          </div>
        )}

        {currentPage === 'login' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-2">Username:</label>
                <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2">Password:</label>
                <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" required />
              </div>
              <Button type="submit">Login</Button>
            </form>
          </div>
        )}

        {currentPage === 'signup' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
            <form onSubmit={(e) => { e.preventDefault(); alert('Sign up functionality not implemented yet.'); }} className="space-y-4">
              <div>
                <label htmlFor="newUsername" className="block mb-2">Username:</label>
                <Input type="text" id="newUsername" className="w-full" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">Email:</label>
                <Input type="email" id="email" className="w-full" required />
              </div>
              <div>
                <label htmlFor="newPassword" className="block mb-2">Password:</label>
                <Input type="password" id="newPassword" className="w-full" required />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2">Confirm Password:</label>
                <Input type="password" id="confirmPassword" className="w-full" required />
              </div>
              <Button type="submit">Sign Up</Button>
            </form>
          </div>
        )}

        {currentPage === 'add_blog' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Add New Blog Post</h1>
            <form onSubmit={(e) => { e.preventDefault(); alert('Blog post added successfully!'); }} className="space-y-4">
              <div>
                <label htmlFor="blogTitle" className="block mb-2">Blog Title:</label>
                <Input type="text" id="blogTitle" className="w-full" required />
              </div>
              <div>
                <label htmlFor="blogContent" className="block mb-2">Content:</label>
                <textarea id="blogContent" className="w-full h-32 p-2 border rounded" required></textarea>
              </div>
              <div>
                <label htmlFor="blogCategory" className="block mb-2">Category:</label>
                <select id="blogCategory" className="w-full p-2 border rounded" required>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="blogImage" className="block mb-2">Image URL:</label>
                <Input type="url" id="blogImage" className="w-full" required />
              </div>
              <Button type="submit">Add Blog Post</Button>
            </form>
          </div>
        )}

        {currentPage === 'user_board' && (
          <div>
            <h1 className="text-3xl font-bold mb-8">My Blog Posts</h1>
            {posts.map(post => (
              <Card key={post.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post.content.substring(0, 100)}...</p>
                  <div className="mt-4">
                    <Button className="mr-2" onClick={() => alert(`Editing post: ${post.title}`)}>Edit</Button>
                    <Button variant="link" onClick={() => alert(`Deleting post: ${post.title}`)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white text-center p-8 mt-16">
        <div className="container mx-auto">
          <p className="mb-4">&copy; 2023 My Blog. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Button variant="link" className="text-white">Privacy Policy</Button>
            <Button variant="link" className="text-white">Terms of Service</Button>
            <Button variant="link" className="text-white">Contact Us</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPreview;

