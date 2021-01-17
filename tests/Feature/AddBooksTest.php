<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AddBooksTest extends TestCase
{
    use RefreshDatabase;

    /** @test 
     * Test the post request api to add a book info in table
     * @return void 
    */
    public function user_can_add_a_book()
    {
        $data = [
            'title'  => 'A book title',
            'author' => 'Brendon',
        ];

        $this->post('/api/addbooklist', $data)->assertStatus(200);

        $this->assertDatabaseHas('books', $data);
    }

    /** @test */
    public function user_can_not_submit_empty_book_title()
    {
        $data = [
            'author' => 'Brendon',
        ];

        $this->post('/api/addbooklist', $data)->assertStatus(422);

        $this->assertDatabaseMissing('books', $data);
    }

    /** @test */
    public function user_cannot_submit_empty_author_name()
    {
        $data = [
            'title' => 'A book title',
        ];

        $this->post('/api/addbooklist', $data)->assertStatus(422);

        $this->assertDatabaseMissing('books', $data);
    }

    /** @test */
    public function user_can_not_submit_duplicate_record()
    {
        $data = [
            'title'  => 'A book title',
            'author' => 'Brendon',
        ];

        $this->post('/api/addbooklist', $data)->assertStatus(200);
        $this->post('/api/addbooklist', $data)->assertStatus(400);

        $this->assertDatabaseHas('books', $data);

        $books = Book::all();
        $this->assertCount(1, $books);
    }
}
