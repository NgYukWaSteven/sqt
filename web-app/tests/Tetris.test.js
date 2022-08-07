import Tetris from "../common/Tetris.js";
import R from "../common/ramda.js";

describe("Hold", function () {
    it(
        `A held piece can be retrieved on a subsequent turn:
        Given a Tetris Game;
        When the sequence Hold > Hard Drop > Hold is performed;
        Then the current tetromino before and after the sequence, is the same.`,
        function () {
            const initial_game = Tetris.new_game();
            const initial_piece = initial_game.current_tetromino;
            // You'll need to implement Tetris.hold before this works.
            const final_game = Tetris.hold(
                Tetris.hard_drop(
                    Tetris.hold(initial_game)
                )
            );
            const final_piece = final_game.current_tetromino;
            if (!R.equals(initial_piece, final_piece)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(initial_piece)}
                    Final:   ${JSON.stringify(final_piece)}`
                );
            }
        }
    );

    it(
        `Hold can't be performed twice in a row:
        Given a Tetris Game where a Hold is performed;
        When one further Hold is performed;
        Then the game state before and after the second hold, is the same.`,
        function () {
            const initial_game = Tetris.hold(Tetris.new_game());//Initial game where hold is performed once already.
            const initial_held_piece = initial_game.held_tetromino;//Initial held piece
            const final_game = Tetris.hold(initial_game);
            const final_held_piece = final_game.held_tetromino;

            if (!R.equals(initial_held_piece, final_held_piece)) {
                throw new Error(
                    `Hold can be performed more than once in a single turn, which shouldn't be allowed.
                    Initial: ${JSON.stringify(initial_held_piece)}
                    Final: ${JSON.stringify(final_held_piece)}`
                )
            }

            
        }
    );

    it(
        `### Change this to your test description ###`,
        function () {
            const initial_game = Tetris.new_game();
            const final_game = Tetris.hold(initial_game);

            if (final_game.current_tetromino != initial_game.next_tetromino){
                throw new Error(
                    `Next tetromino should be deployed when hold is performed given no tetromino is held`
                )
            }
        }
    );
});
