<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Book;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DeleteBooksTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_delete_a_book()
    {
        $book = Book::factory()->create();

        $this->post('/api/deletebooklist', [
            'id' => $book->id,
        ])->assertStatus(200);

        $this->assertDatabaseMissing('books', [
            'id' => $book->id,
        ]);
    }

    /** @test */
    public function user_can_not_delete_book_that_does_not_exists()
    {
        $this->withoutExceptionHandling();

        $this->post('/api/deletebooklist', [
            'id' => 100,
        ])->assertStatus(422);
    }

    /** @test */
    public function book_id_is_required_to_delete_book()
    {
        $this->post('/api/deletebooklist', [])->assertStatus(422);
    }
}
