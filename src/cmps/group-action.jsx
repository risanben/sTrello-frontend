
export const GroupActionModal = ({ group, leftPos, onOpenGroupAction, onDeleteGroup }) => {

    const clickedModal = (ev) => {
        ev.stopPropagation()
    }
    return (
        <section className="group-action" style={{ left: leftPos }} onClick={clickedModal}>
            <div className="group-action-container">
                <div className="group-action-title">Actions</div>
                <div className="group-action-close" onClick={onOpenGroupAction}>X</div>
            </div>
            <div className="group-action-delete" onClick={() => onDeleteGroup(group)}>Delete</div>
        </section>
    )
}