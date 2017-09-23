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
        this.featuredItems$.subscribe(x => {

        });
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
        }
    }

    public featuredItems$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
}

customElements.define(`ce-featured-items`,FeaturedItemsComponent);
