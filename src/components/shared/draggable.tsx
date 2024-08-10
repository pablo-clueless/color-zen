import React from "react"

import { DraggableItemProps } from "@/types/component"
// import { cn } from "@/lib"

interface DraggableProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	items: DraggableItemProps[]
}

const Draggable = React.forwardRef<HTMLDivElement, DraggableProps>(
	({ items, className, ...props }, ref) => {
		const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault()
		}

		const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault()
			const draggableId = e.dataTransfer.getData("transferId")
			const draggedItem = items.find((item) => item.id === draggableId)
			if (draggedItem) {
				console.log("Dropped item:", draggedItem)
			}
		}

		const handleDragStart = (
			e: React.DragEvent<HTMLDivElement>,
			item: DraggableItemProps
		) => {
			e.dataTransfer.setData("transferId", item.id)
		}

		return (
			<div
				ref={ref}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className={className}
				{...props}>
				{items.map((item) => (
					<div
						key={item.id}
						className="h-full flex-1"
						draggable
						onDragStart={(e) => handleDragStart(e, item)}>
						{item.component}
					</div>
				))}
			</div>
		)
	}
)

Draggable.displayName = "Draggable"

export { Draggable }
