namespace SpriteKind {
    export const WIN = SpriteKind.create()
}
function CreateZombie () {
    Zombie = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 7 7 7 7 7 . . . . . . 
        . . . . . 7 7 . 7 7 . . . . . . 
        . . . . . 7 . . . 7 . . . . . . 
        . . . . . 7 7 . 7 7 . . . . . . 
        . . . . . 7 7 7 7 7 . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . . f . f . . . . . . . 
        . . . . . . f . f . . . . . . . 
        . . . . . f f . f f . . . . . . 
        . . . . f f . . . f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, -20, 0)
    Zombie.setKind(SpriteKind.Enemy)
    tiles.placeOnRandomTile(Zombie, sprites.dungeon.darkGroundNorthWest1)
    pause(100)
}
function SKUD () {
    console.log("Checking condition" + (game.runtime() - TimestamplastShot) + "Greather than" + "3000")
    if (game.runtime() - TimestamplastShot >= 3000) {
        SKYD = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 2 . . . . . . . 
            . 4 . 4 . . . . . 2 2 . . . . . 
            . . 4 . f f f f f f 2 . . . . . 
            . . 4 . 4 . . . . 2 2 . . . . . 
            . . . 4 . . . . 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, Rambo, 120, 0)
        music.pewPew.play()
        TimestamplastShot = game.runtime()
        console.log("Setting timestamp to" + TimestamplastShot)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    SKUD()
})
info.onLifeZero(function () {
    game.over(false, effects.splatter)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.WIN, function (sprite, otherSprite) {
    game.over(true, effects.confetti)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbar.value += -10
    info.changeLifeBy(-10)
    otherSprite.destroy(effects.fire, 500)
})
let SKYD: Sprite = null
let Zombie: Sprite = null
let TimestamplastShot = 0
let statusbar: StatusBarSprite = null
let Rambo: Sprite = null
Rambo = sprites.create(img`
    ..............................................
    ..............................................
    ..............................................
    ..............................................
    ..............................................
    ....................fffffff...................
    ....................fffffcf...................
    ....................ffffffff..................
    ...................ffffffffff.................
    ..................fffffffffcf.................
    ..................fffefdfefff.................
    .................fffebddbeffff................
    .................fffe4dbbeffff................
    .................fffe4bbbefcff................
    ................fffffeebbcfcf.................
    ................fccfefdbeffff.................
    ................ffffecffeffcf.................
    ................fffffeeeeeeff.................
    ................fffceeebeb44b.................
    ...............fffeeee1bed44e4b2..............
    ...............ebfee4b4beee4d4b4b.............
    ..............eebeeebbe44b44ddb4b.............
    .............eebffeebb4b3bbebfb44e............
    .............eeeff4bdbbb3dbfffdd4e............
    ............cecfeebddbb3deffee4bee............
    ............eebcebddd4bdbffffbbbee............
    ...........eed4fe4dff44ffffffdd4ee............
    ...........eeecffecffffbffeefbd4ee............
    ..........ebeeffffffffffffeece444e............
    .........eeeefffffffdfffff2efe44ee............
    .........eeeffffffcfdddffeeeefeb4e............
    .........eebfffffffdddffffeeefeeeec...........
    .........e4e4fffffdbdfffffeefe44ee............
    .........c4eeffbefffceffbfeeece4ee............
    .........cee4b4ddffffffffffcfdeeee............
    ...........c44ebeffffffffbcffceece............
    .............eed4ffffffbcbffffffcf............
    ...............edeffffffcefdedffff............
    `, SpriteKind.Player)
Rambo.setScale(0.5, ScaleAnchor.TopLeft)
controller.moveSprite(Rambo)
let LADY = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 5 5 5 5 . . . . . . . 
    . . . . 5 5 3 3 5 5 . . . . . . 
    . . . 5 5 3 3 3 3 3 5 . . . . . 
    . . . 5 3 3 3 3 3 3 5 . . . . . 
    . . . 5 3 f 3 3 f 3 5 5 . . . . 
    . . 5 5 3 3 3 3 3 3 3 5 5 . . . 
    . . 5 3 3 3 3 3 3 3 3 3 5 . . . 
    . . . 3 3 f f f f 3 3 3 3 5 . . 
    . . . 3 3 3 3 3 3 3 3 3 3 5 . . 
    . . . . . e e e e e . . . . . . 
    . . . . . e e e e e . . . . . . 
    . . . . . e . . . e e . . . . . 
    . . . . e e . . . e e . . . . . 
    . . . e e . . . . . e e . . . . 
    `, SpriteKind.WIN)
LADY.setPosition(762, 240)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
tiles.setCurrentTilemap(tilemap`level4`)
statusbar.attachToSprite(Rambo)
statusbar.setLabel("HP", 7)
scene.cameraFollowSprite(Rambo)
info.setLife(statusbar.value)
TimestamplastShot = -3000
console.log("Set timestamp to" + TimestamplastShot)
console.log("Hello" + game.runtime())
forever(function () {
    CreateZombie()
})
forever(function () {
    if (Rambo.isHittingTile(CollisionDirection.Right)) {
        statusbar.value += -3
        info.changeLifeBy(-3)
    }
    if (Rambo.isHittingTile(CollisionDirection.Left)) {
        statusbar.value += -3
        info.changeLifeBy(-3)
    }
    if (Rambo.isHittingTile(CollisionDirection.Top)) {
        statusbar.value += -3
        info.changeLifeBy(-3)
    }
    if (Rambo.isHittingTile(CollisionDirection.Bottom)) {
        statusbar.value += -3
        info.changeLifeBy(-3)
    }
})
