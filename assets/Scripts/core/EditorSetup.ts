import { _decorator, Component, Node, Color } from 'cc';
import { PixelColorManager } from '../managers';
const { ccclass, property, executeInEditMode } = _decorator
@ccclass('EditorSetup')
@executeInEditMode(true)
export class EditorSetup extends Component {
    @property(PixelColorManager)
    colorManager: PixelColorManager = null
    
    @property
    generateTrigger = false

    static hexToColor(hex: string): Color {
        // Remove # if present
        hex = hex.replace(/^#/, '');
        
        // Validate hex length
        if (hex.length !== 6 && hex.length !== 8) {
            throw new Error(`Invalid hex color: ${hex}. Must be 6 or 8 characters.`);
        }
        
        // Parse hex values
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) : 255;
        
        // Check if parsing succeeded
        if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
            throw new Error(`Invalid hex color: ${hex}. Contains non-hex characters.`);
        }
        
        return new Color(r, g, b, a);
    }
    update() {
        if (this.generateTrigger) {
            this.generateTrigger = false
            this.setup()
        }
}
    setup() {
        const palette = [
"#E63946","#F4A261","#E9C46A","#A7C957","#2A9D8F",
"#1B9AAA","#4CC9F0","#3A86FF","#4361EE","#8338EC",
"#FF6B9A","#9C6644","#D9D9D9","#6C757D","#1B1B1B"
];
        this.colorManager.colors = palette.map(hex => EditorSetup.hexToColor(hex));
    }
}


