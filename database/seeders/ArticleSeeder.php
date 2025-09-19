<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Article::create([
            'title' => 'Welcome to Our Blog',
            'content' => 'This is the first article on our blog. We are excited to share our thoughts and ideas with you. Stay tuned for more interesting content!',
        ]);

        \App\Models\Article::create([
            'title' => 'Getting Started with Laravel',
            'content' => 'Laravel is a powerful PHP framework that makes web development enjoyable and creative. In this article, we will explore the basics of Laravel and how to get started with building web applications.',
        ]);

        \App\Models\Article::create([
            'title' => 'React Fundamentals',
            'content' => 'React is a popular JavaScript library for building user interfaces. Learn about components, props, state, and hooks in this comprehensive guide to React fundamentals.',
        ]);

        \App\Models\Article::create([
            'title' => 'Docker for Development',
            'content' => 'Docker simplifies development by containerizing applications. This article covers how to use Docker for local development and deployment.',
        ]);

        \App\Models\Article::create([
            'title' => 'Building REST APIs with Laravel',
            'content' => 'Learn how to build robust REST APIs using Laravel. We will cover routing, controllers, validation, and best practices for API development.',
        ]);
    }
}
