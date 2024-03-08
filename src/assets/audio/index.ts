//@@index('./*.{png,jpg,jpeg,svg,gif,mp3}', (f, _) => `export { default as aud${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)
export { default as audGunshot } from "./gunshot.mp3";
export { default as audMetronome } from "./metronome.mp3";
export { default as audPunch } from "./punch.mp3";
