# Socilize

> Social network

This is a MERN stack application. It is a small social network app that includes authentication, profiles and forum posts.

## GitHub API authentication

You can get an access token by following [these instructions](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
For this app we don't need to add any permissions so don't select any in the _scopes_.
**DO NOT SHARE ANY TOKENS THAT HAVE PERMISSIONS**
This would leave your account or repositories vulnerable, depending on permissions set.

It would also be worth adding your `default.json` config file to `.gitignore`
If git has been previously tracking your `default.json` file then...

```bash
git rm --cached config/default.json
```

Then add your token to the config file and confirm that the file is untracked with `git status` before pushing to GitHub.
GitHub does have your back here though. If you accidentally push code to a repository that contains a valid access token, GitHub will revoke that token. Thanks GitHub 🙏

You'll also need to change the options object in `routes/api/profile.js` where we make the request to the GitHub API to...

```javascript
const options = {
  uri: encodeURI(
    `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
  ),
  method: 'GET',
  headers: {
    'user-agent': 'node.js',
    Authorization: `token ${config.get('githubToken')}`
  }
};
```

# Quick Start 🚀

### Add a default.json file in config folder with the following

```json
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

### Build for production

```bash
cd client
npm run build
```

### Test production before deploy

After running a build in the client 👆, cd into the root of the project.  
And run...

Linux/Unix

```bash
NODE_ENV=production node server.js
```

Windows Cmd Prompt or Powershell

```bash
$env:NODE_ENV="production"
node server.js
```

Check in browser on [http://localhost:5000/](http://localhost:5000/)

### Deploy to Heroku

If you followed the sensible advice above and included `config/default.json` and `config/production.json` in your .gitignore file, then pushing to Heroku will omit your config files from the push.  
However, Heroku needs these files for a successful build.  
So how to get them to Heroku without commiting them to GitHub?

What I suggest you do is create a local only branch, lets call it _production_.

```bash
git checkout -b production
```

We can use this branch to deploy from, with our config files.

Add the config file...

```bash
git add -f config/production.json
```

This will track the file in git on this branch only. **DON'T PUSH THE PRODUCTION BRANCH TO GITHUB**

Commit...

```bash
git commit -m 'ready to deploy'
```

Create your Heroku project

```bash
heroku create
```

And push the local production branch to the remote heroku main branch.

```bash
git push heroku production:main
```

Now Heroku will have the config it needs to build the project.

> **Don't forget to make sure your production database is not whitelisted in MongoDB Atlas, otherwise the database connection will fail and your app will crash.**

After deployment you can delete the production branch if you like.

```bash
git checkout main
git branch -D production
```

Or you can leave it to merge and push updates from another branch.  
Make any changes you need on your main branch and merge those into your production branch.

```bash
git checkout production
git merge main
```

Once merged you can push to heroku as above and your site will rebuild and be updated.

---
