export class MyButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    static get observedAttributes() {
      return ['variant', 'type'];
    }
  
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      if (oldValue !== newValue) {
        this.render();
      }
    }
  
    private render() {
      const variant = this.getAttribute('variant') || 'primary';
      const type = this.getAttribute('type') || 'button';
  
      this.shadowRoot!.innerHTML = `
        <style>
          button {
            all: unset;
            padding: 0.5em 1em;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
          }
          button.primary {
            background-color: #007bff;
            color: white;
            border: 1px solid #007bff;
          }
          button.secondary {
            background-color: white;
            color: #6c757d;
            border: 1px solid #6c757d;
          }
          button.danger {
            background-color: #dc3545;
            color: white;
            border: 1px solid #dc3545;
          }
          button:hover {
            opacity: 0.9;
          }
        </style>
        <button class="${variant}" type="${type}">
          <slot></slot>
        </button>
      `;
  
      this.addEventListener('click', this.handleClick);
    }
  
    private handleClick = (event: Event) => {
      const clickHandler = this.getAttribute('onClick');
      if (clickHandler) {
        const fn = new Function('event', clickHandler);
        fn.call(this, event);
      }
    };
  
    disconnectedCallback() {
      this.removeEventListener('click', this.handleClick);
    }
  }
  
  customElements.define('my-button', MyButton);
  