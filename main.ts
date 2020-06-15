input.onPinPressed(TouchPin.P0, function () {
    if (way == 3) {
        bird.change(LedSpriteProperty.Y, -1)
    }
})
input.onGesture(Gesture.LogoUp, function () {
    if (way == 2) {
        bird.change(LedSpriteProperty.Y, -1)
    }
})
input.onButtonPressed(Button.A, function () {
    if (status == 0) {
        if (way > 1) {
            way += -1
        } else {
            way = 3
        }
    } else if (way == 1) {
        bird.change(LedSpriteProperty.Y, -1)
    }
})
input.onGesture(Gesture.LogoDown, function () {
    if (way == 2) {
        bird.change(LedSpriteProperty.Y, 1)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (status == 0) {
        status = 1
        index = 0
        obstacles = []
        bird = game.createSprite(0, 2)
        bird.set(LedSpriteProperty.Blink, 300)
    }
})
input.onButtonPressed(Button.B, function () {
    if (status == 0) {
        if (way < 3) {
            way += 1
        } else {
            way = 1
        }
    } else if (way == 1) {
        bird.change(LedSpriteProperty.Y, 1)
    }
})
input.onPinPressed(TouchPin.P1, function () {
    if (way == 3) {
        bird.change(LedSpriteProperty.Y, 1)
    }
})
let emptyObstacleY = 0
let ticks = 0
let obstacles: game.LedSprite[] = []
let index = 0
let bird: game.LedSprite = null
let status = 0
let way = 0
way = 1
status = 0
basic.forever(function () {
    if (status == 0) {
        if (way == 1) {
            basic.showLeds(`
                . . . . .
                . # . # .
                # . . . #
                . # . # .
                . . . . .
                `)
        } else if (way == 2) {
            basic.showLeds(`
                . . . . .
                . # # # .
                # . # . #
                # # # # #
                # . . . #
                `)
        } else {
            basic.showLeds(`
                . # # # .
                . # # # .
                . . # . .
                . # # # .
                # # # # #
                `)
        }
    }
    if (status == 1) {
        while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
            obstacles.removeAt(0).delete()
        }
        for (let obstacle2 of obstacles) {
            obstacle2.change(LedSpriteProperty.X, -1)
        }
        if (ticks % 3 == 0) {
            emptyObstacleY = randint(0, 4)
            for (let index2 = 0; index2 <= 4; index2++) {
                if (index2 != emptyObstacleY) {
                    obstacles.push(game.createSprite(4, index2))
                }
            }
        }
        for (let obstacle3 of obstacles) {
            if (obstacle3.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle3.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
                game.setScore(Math.round(input.runningTime() / 1000))
                game.gameOver()
            }
        }
        ticks += 1
        basic.pause(1000)
    }
})
