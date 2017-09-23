import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { FeaturedItem } from "./featured-items-grid-item.component";

const template = document.createElement("template");

const html = require("./featured-items-grid.component.html");
const css = require("./featured-items-grid.component.css");

export class FeaturedItemsGridComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [
            "featured-items"
        ];
    }

    async connectedCallback() {
    
        template.innerHTML = `<style>${css}</style>${html}`; 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'featureditemsgrid');

        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.featuredItems$.subscribe(x => {
            
            x.map((i) => {                                
                const el = document.createElement("ce-featured-items-grid-item");
                el.setAttribute("featured-item", JSON.stringify(i));
                this.shadowRoot.appendChild(el);
            });
        });

    }

    public featuredItems$: BehaviorSubject<Array<FeaturedItem>> = new BehaviorSubject([]);


    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "featured-items":
                this.featuredItems$.next(JSON.parse(newValue));
                break;
        }
    }
}

customElements.define(`ce-featured-items-grid`,FeaturedItemsGridComponent);
