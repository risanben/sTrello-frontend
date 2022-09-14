import { GroupPreview } from './group-preview'

export const GroupList = ({ board }) => {

    return (
        <section className="group-list">
            {board.groups.map(group => {
                return <GroupPreview key={group.id} group={group} />
            })}
        </section>
    )
}