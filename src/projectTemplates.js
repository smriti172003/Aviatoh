import { topicsCollection, updateOrCreateDocument } from "./db";

const defaultTemplate = [
    {
      title: 'Introduction',
      project: '',
      description: 'Short summary of the project',
      topics: [],
      type: 'single',
    }
  ];



const startupbusinessideaTemplate = [
    {
      title: 'Introduction',
      project: '',
      description: 'Short summary of what problem does the idea solve and how?',
      topics: [],
      type: 'single'
    },
     {
       title: 'Idea in detail',
       project: '',
       description: 'Detailed explanation about how does the solution work.',
       topics: [],
       type: 'single'
     },
     {
      title: 'Market Research',
      project: '',
      description: 'Marketing and Sales Strategy',
      topics: [],
      type: 'collection'
   },
     {
      title: 'Technical Docs',
      project: '',
      description: 'Prototype, MVP or other technical implementation details.',
      topics: [],
      type: 'collection'
    },
  ];


const writeabookTemplate = [
    {
        title: 'Introduction',
        project: '',
        description: 'Short summary of the book',
        topics: [],
        type: 'single'
    },
    {
        title: 'Front Matter',
        project: '',
        description: 'Pages like Table of Contents, Dedication page, Preface etc.',
        topics: [],
        type: 'collection'
    },
    {
        title: 'Body',
        project: '',
        description: 'Pages like Prologue, Chapters, Epilogue, Conclusion etc.',
        topics: [],
        type: 'collection'
    },
    {
        title: 'Back Matter',
        project: '',
        description: 'Pages like Acknowledgements, About the author, Glossary etc.',
        topics: [],
        type: 'collection'
    },
  ];




export const templatePaths = (email, template, projectTitle) => {
    switch(template){
      case 'Project':
        defaultTemplate.map((path, i) => {
          if(path.type === 'single'){
            const key = email + new Date().toString().replaceAll(" ", "") + i;
            updateOrCreateDocument(topicsCollection, key, {
              data: `<h3 style="text-align: left;">${path.title}</h3>`
            });
            path.topics = [{
              id: key,
              title: path.title
            }]
          }
        })
        return defaultTemplate.map(x=> {return {...x, project: projectTitle}});
      case 'Startup/Business':
        startupbusinessideaTemplate.map((path, i) => {
          if(path.type === 'single'){
            const key = email + new Date().toString().replaceAll(" ", "") + i;
            updateOrCreateDocument(topicsCollection, key, {
              data: `<h3 style="text-align: left;">${path.title}</h3>`
            });
            path.topics = [{
              id: key,
              title: path.title
            }]
          }
        })
        return startupbusinessideaTemplate.map(x=> {return {...x, project: projectTitle}});
      case 'Book':
        writeabookTemplate.map((path, i) => {
          if(path.type === 'single'){
            const key = email + new Date().toString().replaceAll(" ", "") + i;
            updateOrCreateDocument(topicsCollection, key, {
              data: `<h3 style="text-align: left;">${path.title}</h3>`
            });
            path.topics = [{
              id: key,
              title: path.title
            }]
          }
        })
        return writeabookTemplate.map(x=> {return {...x, project: projectTitle}});
    }
  }