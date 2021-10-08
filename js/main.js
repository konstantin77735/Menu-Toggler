document.addEventListener('DOMContentLoaded', () => {
    
    class MenuToggler {
        constructor(data) {
            this.menuTriggerSelector = data.menuTriggerSelector;
            this.menuSelector = data.menuSelector;
            this.type = data.type || 'appear'; //type of Apperance
            this.transitionTime = data.transitionTime || '.25s';
            this.transitionType = data.transitionType || '.ease';
            this.menuDisplay = data.menuDisplay || 'block';
            this.slideBegin = data.slideBegin || 'translate(-100%, 0px)';//Begin coordinate (x, y). Обязательно добавлять px к любому числу
            this.slideEnd = data.slideEnd || 'translate(0px, 0px)';//Begin coordinate (x, y). Обязательно добавлять px к любому числу
            
            
            this.menuTrigger = document.querySelector(`${this.menuTriggerSelector}`);
            this.menu = document.querySelector(`${this.menuSelector}`);
            this.isChanging = false;
            this.state = 'hide';

            this.init();
        }

        init() {

            this.menuTrigger.addEventListener('click', this.toggle.bind(this));
            this.menuTrigger.addEventListener('touchstart', this.toggle.bind(this));
            
            if (this.type == 'appear') {
                // add first styles, makes elem invisible and untouchuble
                //this.menu.style.transition = 'none';
                this.menu.style.height = '0';
                this.menu.style.opacity = 0;
                this.menu.style.display = 'none';



                //                this.menu.style.cssText = `-webkit-transition: opacity ${this.transitionTime} ${this.transitionType} ${this.transitionTime}, height 0s ${this.transitionType} 0s`;
                //                this.menu.style.cssText = `-o-transition: opacity ${this.transitionTime} ${this.transitionType} ${this.transitionTime}, height 0s ${this.transitionType} 0s`;

                

                this.menu.addEventListener('transitionend', (e) => {
                    if (e.target == this.menu) {
                        this.isChanging = false;

                        if (this.state == 'hide') {
                            this.menu.style.display = 'none'
                        }
                    }

                });
            }
            
            if(this.type == 'slide'){
                document.body.style.overflow = 'hidden';
                
                
                this.setVendorStyleProperty(this.menu, 'transition', `transform ${this.transitionTime} ${this.transitionType}`);
                this.setVendorStyleProperty(this.menu, 'transform', this.slideBegin);
            }

        }

        setVendorStyleProperty (element, property, value) {

                    element.style["webkit" + property] = value;
                    element.style["moz" + property] = value;
                    element.style["ms" + property] = value;
                    element.style["o" + property] = value;
                    element.style[property] = value;
                

            }
        
        toggle() {

            if (this.type == 'appear' && !this.isChanging) {

                if (this.menu.style.opacity == '1') {
                    this.setVendorStyleProperty(this.menu, 'transition', `opacity ${this.transitionTime} ${this.transitionType}`);

                    if (this.menuTrigger.classList.contains('burger')) {
                        this.menuTrigger.classList.remove('burger_close');
                    }

                    this.state = 'hide';
                    this.menu.style.height = '0';
                    this.menu.style.opacity = '0';
                    this.isChanging = true;
                    return;
                }
                if (this.menu.style.opacity == '0') {

                    
                    if (this.menuTrigger.classList.contains('burger')) {
                        this.menuTrigger.classList.add('burger_close');
                    }
                    
                    
                    this.state = 'show';
                    this.menu.style.display = this.menuDisplay;
                    setTimeout(() => {
                        this.setVendorStyleProperty(this.menu, 'transition', `opacity ${this.transitionTime} ${this.transitionType}`);
                        this.menu.style.height = 'initial';
                        this.menu.style.opacity = '1';
                        this.isChanging = true
                    }, 1);
                    return;
                }

            }
            
            if (this.type == 'slide' && !this.isChanging) {
                
                
                if(this.menu.style.transform == this.slideBegin){
                    if (this.menuTrigger.classList.contains('burger')) {
                        this.menuTrigger.classList.add('burger_close');
                    }
                    
                    this.setVendorStyleProperty(this.menu, 'transform', this.slideEnd);
                    
                }
                else{
                    if (this.menuTrigger.classList.contains('burger')) {
                        this.menuTrigger.classList.remove('burger_close');
                    }
                    
                     this.setVendorStyleProperty(this.menu, 'transform', this.slideBegin);
                }
                
            }
        }
    }

    const menuToggler1 = new MenuToggler({
        menuTriggerSelector: '.burger', //if burger, to onClick add class burger_close
        menuSelector: '.mobile-menu',
        transitionTime: '2.5s',
        transitionType: 'linear',
        menuDisplay: 'grid',
        type: 'slide', //appear OR slide, appear by default
        slideBegin: 'translate(200%, 0px)', // Обязательно добавлять px к любому числу
        slideEnd: 'translate(0px, 0px)', // Обязательно добавлять px к любому числу
    });

});
