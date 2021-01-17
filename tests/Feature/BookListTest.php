<?php

namespace Tests\Feature;

use App\Models\Book;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BookListTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_see_list_of_books()
    {
        Book::factory()->count(3)->create();

        $this->get('/api/home')->assertStatus(200)->assertJsonCount(3);
    }
}
