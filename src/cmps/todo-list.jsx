import { TodoPreview } from "./todo-preview"

export const TodoList = ({ checklist, onToggleTodo, onRemoveTodo, onSaveTodo }) => {

    const displayTodos = () => {
        return checklist.todos.map((todo, index) =>
            <TodoPreview
                key={index}
                todo={todo}
                onSaveTodo={onSaveTodo}
                onToggleTodo={onToggleTodo}
                onRemoveTodo={onRemoveTodo}
            />)
    }


    return <section className="todo-list">{displayTodos()}</section>
}