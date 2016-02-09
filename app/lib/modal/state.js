import {EventEmitter} from 'events';
import {defaults} from 'lodash/object';

export class ModalState extends EventEmitter {
    static defaults = {
        activeClassName: 'modal-open',
        transitionDuration: 300
    };

    constructor(props){
        super();
        defaults(this, props, ModalState.defaults);
        this.components = new Set();
        this.componentProps = new WeakMap();
    }

    open( ModalComponent, props ){
        this.components.add(ModalComponent);
        this.componentProps.set(ModalComponent, props);
        this.emit('change');
    }

    close( Component ){
        this.components.delete( Component );
        this.componentProps.delete( Component );
        this.emit('change');
    }

    closeAll(){
        Array.from(this.components).forEach(this.close.bind(this));
    }

    toArray(){
        return Array
            .from(this.components)
            .map(Component => {
                return {
                    Component,
                    props: this.componentProps.get(Component)
                };
            });
    }

    registerToBody( body ){
        var checkComponentsAndToggle = ()=> {
            if (this.components.size) {
                body.classList.add( this.activeClassName );
            } else {
                setTimeout(()=>{
                    body.classList.remove( this.activeClassName );
                }, this.transitionDuration );
            }
        };

        this.on('change', checkComponentsAndToggle);

        body.addEventListener('keyup', (e)=> {
            if (e.keyCode !== 27) return;
            this.closeAll();
        });

        checkComponentsAndToggle();
    }
}
