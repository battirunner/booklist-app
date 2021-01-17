<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BookUpdateTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_update_book_title()
    {
        $this->withoutExceptionHandling();
        $book = Book::factory()->create();

        $data = [
            'id'    => $book->id,
            'title' => 'Changed',
        ];

        $this->post('/api/editbooklist', $data)->assertStatus(200);

        $this->assertDatabaseHas('books', $data);
    }

    /** @test */
    public function user_can_update_book_author()
    {
        $this->withoutExceptionHandling();
        $book = Book::factory()->create();

        $data = [
            'id'     => $book->id,
            'author' => 'Changed',
        ];

        $this->post('/api/editbooklist', $data)->assertStatus(200);

        $this->assertDatabaseHas('books', $data);
    }

    /** @test */
    public function user_can_not_update_non_existing_book()
    {
        $this->withoutExceptionHandling();

        $data = [
            'id'     => 1000,
            'author' => 'Changed',
        ];

        $this->post('/api/editbooklist', $data)->assertStatus(422);

        $this->assertDatabaseMissing('books', $data);
    }
}
