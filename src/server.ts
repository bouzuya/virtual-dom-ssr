import express from 'express';
import renderToHTML from 'vdom-to-html';
import { model } from './model';
import { view } from './view';
import { User } from './user';
import { State } from './state';

export default function main() {
  const app = express();
  app.get('/users/:userId', (req: any, res: any) => {
    model(req.params)
      .then(state => {
        const vtree = view(state, true);
        const html = renderToHTML(vtree);
        res.send(html);
      }, (error: Error) => {
        res.send(error.message);
      });
  });
  app.use(express.static(__dirname + '/../dist/'));
  app.listen(3000);
}