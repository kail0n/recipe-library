const db = require('../db/config')
const SQL = require('sql-template-strings');

class Recipe {
    constuctor(data) {
        this.id = data.id
        this.name = data.name
        this.author = data.author
        this.serves = data.serves
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const recipeData = await db.run(SQL`SELECT * FROM recipes;`);
                const recipes = recipeData.rows.map(d => new Recipe(d));
                resolve(recipes);
            } catch(err) {
                reject('Error recieving recipes');
            };
        });
    };

    static findById(id) {
        return new Promise (async (resolve, reject) => {
            try {
                let recipeData = await db.run(SQL`SELECT * FROM recipes WHERE id = ${id};`);
                let recipe = new Recipe(recipeData.rows[0]);
                resolve(recipe);
            } catch(err) {
                reject('Recipe not found');
            };
        });
    };

    static create(name, author, serves) {
        return new Promise (async (resolve, reject) => {
            if (author = '') {
                author = 'anon';
            };
            try {
                let recipeData = await db.run(SQL`INSERT INTO recipes (name, author, serves) VALUES (${name}, ${author}, ${serves}) RETURNING *;`);
                let newRecipe = new Recipe(recipeData.rows[0]);
                resolve(newRecipe);
            } catch(err) {
                reject('Error adding recipe');
            };
        });
    };

    // update(updateData) {
    //     return new Promise (async (resolve, reject) => {
    //         try {
    //             let updatedRecipeData = await db.run(SQL`UPDATE recipes SET ???;`);
    //             let updatedRecipe = new Recipe(updatedRecipeData.rows[0]);
    //             resolve(updatedRecipe);
    //         } catch(err) {
    //             reject('Error updating recipe');
    //         };
    //     });
    // };

    destroy() {
        return new Promise (async (resolve, reject) => {
            try {
                await db.run(SQL`DELETE FROM recipes WHERE id = ${this.id};`);
                resolve('Recipe is deleted');
            } catch(err) {
                reject('Error deleting recipe');
            };
        });
    };
};

module.exports = Recipe;