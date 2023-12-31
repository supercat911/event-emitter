// @ts-check

/** @module EventEmitter */


/**
 * @callback TListener
 * @param {...*} params
 */

/** 
 * 
 * @class 
 * */
class EventEmitter  {
    /**
     * Creates an instance of EventEmitter.
     *
     * @constructor
     */
    constructor() {
    
        /**
         * @type {Object.<string, Array.<TListener>>}
         */
        this.events = {};
    }

    /**
     *
     * @method
     * @param {string} event
     * @param {TListener} listener
     */
    on(event, listener) {

        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }

        this.events[event].push(listener);
    }
    /**
     *
     * @method
     * @param {string} event
     * @param {TListener} listener
     */
    removeListener(event, listener) {
        var idx;

        if (typeof this.events[event] === 'object') {
            idx = this.events[event].indexOf(listener);

            if (idx > -1) {
                this.events[event].splice(idx, 1);
            }
        }

    }
    /**
     *
     * @method
     * @param {(string)} event
     */
    emit(event) {
        if (typeof this.events[event] !== 'object') return;

        var i, listeners, length, args = [].slice.call(arguments, 1);

        listeners = this.events[event].slice();
        length = listeners.length;

        for (i = 0; i < length; i++) {
            try {
                listeners[i].apply(this, args);
            }
            catch (e) {
                console.error(event);
                console.error(e);
            }
        
        }
    }
    
    /**
     *
     * @method 
     * @param {(string)} event
     * @param {TListener} listener
     */
    once(event, listener) {
        this.on(event, function g() {
            this.removeListener(event, g);
            listener.apply(this, arguments);
        });
    }
}

export {EventEmitter};
