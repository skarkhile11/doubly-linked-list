const Node = require('./node');

class LinkedList {
    constructor() {
        this._tail = new Node();
        this._head = new Node();
        Object.defineProperty(this, 'length', {
    get: function () {
        var i = 0;
        if (this._head.next === null
            && this._tail.prev === null) {
            i = 0;
        } else {
            i = -1;
        }
        var nxtNode = this._head.next;
        while (nxtNode !== null) {
            i++;
            nxtNode = nxtNode.next;
        }
        return i;
    }
        })
    }

    append(data) {
        var newNode = new Node(data);
        if (this._head.next == null && this._tail.prev == null) {
            this._head.next = newNode;
            this._tail.prev = newNode;
            newNode.prev = this._head;
            newNode.next = this._tail;
        } else if (this._tail.prev !== null) {
            var nodePrev = this._tail.prev;
            this._tail.prev = newNode;
            newNode.next = this._tail;
            newNode.prev = nodePrev;
            nodePrev.next = newNode;
        }
        return this;
    }

    head() {
        if (this._head.next !== null) {
            return this._head.next.data;
        }
        return null;
    }

    tail() {
        if (this._tail.prev !== null) {
            return this._tail.prev.data;
        }
        return null;
    }

    at(index) {
        return this.findItem(index).data;
    }

    insertAt(index, data) {
        if (index < 0 || (this.length === 0 && index > 0)) {

            return this;
        }
        var newNode = new Node(data);
        if (this.length === 0 && index === 0) {

            if (this._head.next == null && this._tail.prev == null) {
                this._head.next = newNode;
                this._tail.prev = newNode;
                newNode.prev = this._head;
                newNode.next = this._tail;
            }
        } else {
            var item = this.findItem(index);
            if (item !== null) {
                if (item.prev !== null && item.next !== null) {
                    newNode.next = item;
                    newNode.prev = item.prev;
                    item.prev.next = newNode;
                    item.prev = newNode;

                }
            }
        }
        return this;
    }

    isEmpty() {
        return this.length <= 0;
    }

    clear() {
        this._head.next = null;
        this._head.prev = null;
        this._tail.next = null;
        this._tail.prev = null;
        return this;
    }

    deleteAt(index) {
        if (index < 0 || (this.length === 0 && index > 0)) {

            return this;
        }
        var item = this.findItem(index);
        if (item !== null) {

            if (item.prev !== null && item.next !== null) {
                item.prev.next = item.next;
                item.next.prev = item.prev;
                item.prev = null;
                item.next = null;
                item = null;
            }
        }
        return this;
    }

    reverse() {
        var dlst = new LinkedList();
        for (var index = 0; index < this.length; index++) {
            var item = this.findItem(index);
            dlst.insertAt(0, item.data);
        }
        this._head = dlst._head;
        this._tail = dlst._tail;
        return this;
    }

    indexOf(data) {
        var i = -1;
        var nextNode = this._head.next;
        if (nextNode === null) {
            return i;
        }
        var foundIndex = -1;
        while (nextNode !== null &&
            nextNode.data !== null) {
            i++;
            if (data === nextNode.data) {
                foundIndex = i;
                break;
            }
            nextNode = nextNode.next;
        }
        return foundIndex;
    }

    findItem(index) {
        var i = -1;
        var nextNode = this._head.next;
        var foundData = null;
        if (nextNode === null || index < 0) {
            return foundData;
        }

        while (nextNode !== null) {
            i++;
            if (i === index) {
                foundData = nextNode;
                break;
            }
            nextNode = nextNode.next;
        }
        return foundData;
    }
}

module.exports = LinkedList;
