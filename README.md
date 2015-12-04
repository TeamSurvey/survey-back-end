#Duck Poll

##Description

This single-page application (SPA) can be used to create custom polls.

For the **front-end** repository and a description of this single-page application (SPA) please click [here](https://github.com/TeamSurvey/survey-front-end).

Heroku URL: https://hidden-springs-2370.herokuapp.com/


##Routes

- For more detail please refer to the poll.js and pollAnswer.js files in the controllers folder

###Poll Routes

```
router.get('/', pollCtrl.index);

router.post('/', pollCtrl.create);

router.get('/:id', pollCtrl.read);

router.patch('/:id', pollCtrl.update);

router.delete('/:id', pollCtrl.destroy);
```

###Poll Answer Routes

```
router.get('/', pollCtrl.index);

router.post('/', pollAnswerCtrl.create);

router.get('/:pollID', pollAnswerCtrl.read);
```
