import "./featured-items-grid-item.component";
import "./featured-items-grid.component";

import { BehaviorSubject } from "rxjs/BehaviorSubject";


const template = document.createElement("template");
const html = require("./featured-items.component.html");
const css = require("./featured-items.component.css");

export class FeaturedItemsComponent extends HTMLElement {
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
            this.setAttribute('role', 'featureditems');

        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.featuredItems$.subscribe(x => this.gridHTMLElement.setAttribute("featured-items",JSON.stringify(x)));
        
        this.title$.subscribe(x => this.titleHTMLElement.innerText = x);

        this.linkCaption$.subscribe(x => this.linkHTMLElement.innerText = x);
    }

    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "featured-items":
                this.featuredItems$.next(JSON.parse(newValue));
                break;

            case "featured-items-title":
                this.title$.next(newValue);
                break;
        }
    }

    public title$: BehaviorSubject<string> = new BehaviorSubject("");

    public linkCaption$: BehaviorSubject<string> = new BehaviorSubject("");

    public featuredItems$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

    public get titleHTMLElement(): HTMLElement { return this.shadowRoot.querySelector("h2"); }

    public get linkHTMLElement(): HTMLElement { return this.shadowRoot.querySelector("a"); }

    public get gridHTMLElement(): HTMLElement { return this.shadowRoot.querySelector("ce-featured-items-grid") as HTMLElement; }
}

customElements.define(`ce-featured-items`,FeaturedItemsComponent);
