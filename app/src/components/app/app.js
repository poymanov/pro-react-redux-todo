import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import './app.css';

export default class App extends Component {
    maxId = 100;

    state = {
        items: [
            this.createItem('Drink Coffee'),
            this.createItem('Make Awesome App'),
            this.createItem('Have a lunch'),
        ],
        filter: 'all',
        search: ''
    };

    createItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };

    onDelete = (id) => {
        this.setState((state) => {
            const idx = state.items.findIndex((el) => el.id === id);

            const items = [
                ...state.items.slice(0, idx),
                ...state.items.slice(idx + 1),
            ];

            return {items};
        });
    };

    onItemAdded = (label) => {
        this.setState((state) => {
            const item = this.createItem(label);
            return {items: [...state.items, item]};
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    onToggleDone = (id) => {
        this.setState((state) => {
            const items = this.toggleProperty(state.items, id, 'done');
            return {items};
        })
    };

    onToggleImportant = (id) => {
        this.setState((state) => {
            const items = this.toggleProperty(state.items, id, 'important');
            return {items};
        })
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    onSearchChange = (search) => {
        this.setState({search});
    };

    filterItems(items, filter) {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => !item.done);
        } else if (filter === 'done') {
            return items.filter((item) => item.done);
        }
    }

    searchItems(items, search) {
        if (search.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    };

    render() {
        const {items, filter, search} = this.state;
        const doneCount = items.filter((item) => item.done).length;
        const todoCount = items.length - doneCount;
        const visibleItems = this.searchItems(this.filterItems(items, filter), search)

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
                </div>

                <TodoList
                    items={visibleItems}
                    onDelete={this.onDelete}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.onItemAdded}/>
            </div>
        );
    }
};

