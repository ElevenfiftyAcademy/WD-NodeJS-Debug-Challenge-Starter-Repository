const router = require('express').Router();
const { GameModel } = require("../models");

router.get('/all', async (req, res) => {
    try {
        const Games = await GameModel.findAll({
            where: {
                owner_id: req.user.id
            }
        })
        res.status(200).json({
            games: games,
            message: "Data fetched"
        })
    } catch (error) {
        res.status(500).json({
            message: `Data not found: ${error}`
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const Game = await GameModel.findOne({
            where: {
                id: req.params.id,
                owner_id: req.user.id,
            }
        })
        res.status(200).json({
            games: Game,
            message: "Game fetched"
        })
    } catch (error) {
        res.status(500).json({
            message: `Game not found: ${error}`
        })
    }
})

router.post('/create', async (req, res) => {
    let { title, studio, esrb_rating, user_rating, have_played } = req.body.game;
    try {
        await GameModel.create({
            title, 
            studio, 
            esrb_rating, 
            user_rating, 
            have_played,
            owner_id: req.body.user.id
        })
    } catch (error) {
        res.status(500).json({
            message: `Game not created: ${error}`
        })
    }
})

router.put('/update/:id', async (req, res) => {
    let { title, studio, esrb_rating, user_rating, have_played } = req.body.game;

    const updatedGame = {
        title,
        studio,
        esrb_rating,
        user_rating,
        have_played
    }

    try {
        const update = await GameModel.update(updatedGame, { 
			where: {
            	id: req.params.id,
            	owner_id: req.user
        	}
		})
		res.status(200).json({
			game: update,
			message: "Successfully updated."
		})
    } catch (error) {
        res.status(500).json({
            message: `Game not updated: ${error}`
        })
    }
})

router.delete('/remove/:id', async (req, res) => {
	const ownerId = req.user.id;
    const gameId = req.params.id;
	
	try {
        const query = {
            where: {
                id: gameId,
                owner: ownerId
            }
        };

        await GameModel.destroy(query);
        res.status(200).json({ 
			message: "Game successfully removed" 
		});
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = routers;