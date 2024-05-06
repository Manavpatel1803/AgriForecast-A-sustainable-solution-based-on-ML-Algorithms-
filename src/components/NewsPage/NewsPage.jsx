import React, { useState, useEffect } from 'react';


const NewsPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=agriculture&sortBy=publishedAt&apiKey=449c324847d746a1845ee301252eaf24`);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Live News</h1>
      {articles.map((article, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-600 mb-2">{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
