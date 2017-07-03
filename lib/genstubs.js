const path = require('path');
const _range = require('lodash.range');
const ProgressBar = require('progress');
const Chance = require('chance');
const chance = new Chance();
const fs = require('fs');

module.exports = function genstubs({number, layout, paragraphs, tags, cats, catPool, tagPool}) {
  // init progress bar
  const bar = new ProgressBar(
    '  [:bar]   :current/:total   :percent   Remaining: :etas',
    {
      complete: '=',
      incomplete: ' ',
      width: 30,
      total: number
    }
  );
  const isPost = layout === 'post';
  const isPage = layout === 'page';
  const userSourcePath = path.join(process.cwd(), '/source');

  console.log(`Generating "${number}" ${isPost ? 'posts': 'pages'}, with ${paragraphs} paragraphs each (${tags} tags, ${cats} categories)`);

  // init pools
  let _catPool = _range(catPool).map(() => chance.word({syllables: 3}));
  let _tagPool = _range(tagPool).map(() => chance.word({syllables: 2}));

  return _range(number).map((n) => {
    n = n + 1; // 0-based => 1-based
    const destination = path.join(userSourcePath,(isPost ? `/_posts/post-${n}.md` : `/page-${n}.md`));
    const _categories = chance.pickset(_catPool, cats).map((s) => `- ${s}`).join('\n');
    const _tags = chance.pickset(_tagPool, tags).map((s) => `- ${s}`).join('\n');
    const _paragraphs =
      _range(paragraphs)
       .map((j) => chance.paragraph())
       .join('\n\n');
    let _source = { destination, content: content({isPost, n, categories: _categories, tags: _tags, paragraphs: _paragraphs}) };
    fs.writeFileSync(_source.destination, _source.content);
    bar.tick(1);
  });
}


function content({isPost, n, categories, tags, paragraphs}) {
  // note the multiline string is not indented as indentations are kept intact
  // first new line is escaped with '\'
  let content =
`\
---
title: ${isPost ? 'Post': 'Page'} ${n}
date: 1970-01-01
categories:
${categories}
tags:
${tags}
---

${paragraphs}
`;
return content;
}
