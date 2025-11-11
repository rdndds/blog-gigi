import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content/data');

export function getContentData(filename: string) {
  const fullPath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}

export function getHeroData() {
  return getContentData('hero.json');
}

export function getAboutData() {
  return getContentData('about.json');
}

export function getHobbiesData() {
  return getContentData('hobbies.json');
}

export function getWidgetsData() {
  return getContentData('widgets.json');
}
