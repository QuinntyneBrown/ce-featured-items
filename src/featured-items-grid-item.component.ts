import { BehaviorSubject } from "rxjs/BehaviorSubject";

const template = document.createElement("template");

const html = require("./featured-items-grid-item.component.html");
const css = require("./featured-items-grid-item.component.css");


export interface FeaturedItem {
    title: string;
    imageUrl: string;
    category: string;
}

export class FeaturedItemsGridItemComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [
            "featured-item"
        ];
    }

    public featuredItem$: BehaviorSubject<FeaturedItem> = new BehaviorSubject(<FeaturedItem>{});

    async connectedCallback() {
    
        template.innerHTML = `<style>${css}</style>${html}`; 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'featureditemsgriditem');

        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.featuredItem$.subscribe(x => {
            this.titleHTMLElement.innerText = x.title;
            this.categoryHTMLElement.innerText = x.category;
            this.imageHTMLElement.src = x.imageUrl;
        });
    }

    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "featured-item":                
                this.featuredItem$.next(JSON.parse(newValue));
                break;
        }
    }

    public get titleHTMLElement(): HTMLElement { return this.shadowRoot.querySelector("h2"); }

    public get categoryHTMLElement(): HTMLElement { return this.shadowRoot.querySelector("h3"); }

    public get imageHTMLElement(): HTMLImageElement { return this.shadowRoot.querySelector("img"); }
}

customElements.define(`ce-featured-items-grid-item`,FeaturedItemsGridItemComponent);
