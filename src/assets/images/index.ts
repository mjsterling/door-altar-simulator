//@@index('./*.{png,jpg,jpeg,svg,gif}', (f, _) => `export { default as img${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)
export { default as imgInventoryTab } from "./Inventory_tab.png";
export { default as imgInventory } from "./Inventory.png";
export { default as imgPrayerIconDetail } from "./Prayer_icon_(detail).png";
