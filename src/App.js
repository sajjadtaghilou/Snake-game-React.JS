import React, { Component } from "react";
import "./App.css";

class App extends Component {
    state = {
        collided: false,
        isLoaded: false,
        score: 0
    };

    componentDidMount() {
        this.loadGame();
    }
    loadGame() {
        this.setState({ isLoaded: false });
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        // create the unit
        const box = 32;

        // create the snake
        let snake = [];
        snake[0] = {
            x: 9 * box,
            y: 9 * box
        };

        // create the food

        let food = {
            x: Math.floor(Math.random() * 12 + 1) * box,
            y: Math.floor(Math.random() * 10 + 3) * box
        };

        // create the score var

        let score = 0;

        //control the snake

        let d;

        const direction = event => {
            let key = event.keyCode;
            if (key === 37) {
                d = "LEFT";
            } else if (key === 38) {
                d = "UP";
            } else if (key === 39) {
                d = "RIGHT";
            } else if (key === 40) {
                d = "DOWN";
            }
        };
        document.addEventListener("keydown", direction);

        const collision = (head, array) => {
            for (let i = 0; i < array.length; i++) {
                if (head.x === array[i].x && head.y === array[i].y) {
                    return false;
                }
            }

            return false;
        };

        const draw = () => {
            ctx.fillStyle = "#6ab04c";
            ctx.fillRect(0, 0, 480, 480);
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = i === 0 ? "#000" : "#000";
                ctx.fillRect(snake[i].x, snake[i].y, box, box);

                ctx.strokeStyle = "#013220";
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }

            ctx.fillStyle = "#000";
            ctx.fillRect(food.x, food.y, 32, 32);

            // old head position
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            // which direction
            if (d === "LEFT") snakeX -= box;
            if (d === "UP") snakeY -= box;
            if (d === "RIGHT") snakeX += box;
            if (d === "DOWN") snakeY += box;

            // if the snake eats the food
            if (snakeX === food.x && snakeY === food.y) {
                score++;
                this.setState({ score });
                food = {
                    x: Math.floor(Math.random() * 12 + 1) * box,
                    y: Math.floor(Math.random() * 10 + 3) * box
                };
                // we don't remove the tail
            } else {
                // remove the tail
                snake.pop();
            }

            // add new Head

            let newHead = {
                x: snakeX,
                y: snakeY
            };

            // game over

            if (
                snakeX < box - 32 ||
                snakeX > 15 * box - 32 ||
                snakeY < box - 32 ||
                snakeY > 15 * box - 32 ||
                collision(newHead, snake)
            ) {
                this.setState({ collided: true, interval: false });
                clearInterval(game);
            }

            snake.unshift(newHead);
        };
        let game = setInterval(draw, 100);
        // so it doesn't show the previous canvas drawings
        setTimeout(() => this.setState({ isLoaded: true }), 100);
    }
    handleClick = () => {
        this.setState({ collided: false, score: 0 });
        this.loadGame();
    };

    render() {
        return ( <
                div className = "App" >
                <
                h1 className = "score" > Score: { this.state.score } < /h1> {!this.state.isLoaded ? < div className = "overlay" / >: null
            } {
                this.state.collided ? ( <
                    div className = "menu" >
                    <
                    button className = "btnPlayAgain"
                    onClick = { this.handleClick } >
                    Play Again <
                    /button> < /
                    div >
                ) : null
            } <
            canvas id = "snake-game"
        ref = "canvas"
        width = { 480 }
        height = { 480 }
        /> < /
        div >

    );
}
}

export default App;