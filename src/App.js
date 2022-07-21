import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  const custom = {
    id: `id-${k}`,
    content: `Quote ${k}`,
  };

  return custom;
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function List({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided) => (
        <div
          className="border text-center select-none shadow-md bg-white py-6 text-lg font-medium rounded px-8"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.content}
        </div>
      )}
    </Draggable>
  );
}

const Lists = React.memo(function Lists({ quotes }) {
  return quotes.map((quote, index) => (
    <List quote={quote} index={index} key={quote.id} />
  ));
});

function App() {
  const [state, setState] = React.useState({ quotes: initial });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({ quotes });
  }

  return (
    <main className="bg-blue-400">
      <section className="container mx-auto">
        <div className="max-w-sm py-20 mx-auto">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div
                  className="grid grid-cols-1 gap-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Lists quotes={state.quotes} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </section>
    </main>
  );
}

export default App;
