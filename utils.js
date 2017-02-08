import settings from './settings';

/**
 * Returns section defined in settings that should be displayed at given url.
 * @param  {String} url [path after '/admin' (example '/something/posts').]
 * @return {Object}     [Section that sould be displayed at given url.]
 */ 
export function getSectionByUrl(url) {
  url = url.replace(/^(\/)|(\/)$/g, "");
  const urls = url.split('/');

  let section = settings().sections.find(e => e.urlName === urls[0]);
  if(!section) return null;

  for(let i = 1; i < urls.length; i++) {
    if(!section.children) return null;
    section = section.children.find(e => e.urlName === urls[i]);

    if(!section) return null;
  }

  return section;
}