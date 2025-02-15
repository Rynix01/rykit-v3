import RyKit from "rykit-v3";

const rykit = new RyKit();

async function testStateOperations() {
  try {
    console.log("\n=== State Management Tests ===");

    // Test basic state creation
    console.log("\n1. Testing basic state creation...");
    const counterState = rykit.createState({
      count: 0,
      lastUpdated: null,
    });

    console.log("Initial state:", counterState.getState());

    // Test state updates
    console.log("\n2. Testing state updates...");
    counterState.setState((prev) => ({
      ...prev,
      count: prev.count + 1,
      lastUpdated: new Date().toISOString(),
    }));
    console.log("Updated state:", counterState.getState());

    // Test state subscription
    console.log("\n3. Testing state subscription...");
    const unsubscribe = counterState.subscribe((state) => {
      console.log("State changed:", state);
    });

    // Multiple updates
    for (let i = 0; i < 3; i++) {
      counterState.setState((prev) => ({
        ...prev,
        count: prev.count + 1,
        lastUpdated: new Date().toISOString(),
      }));
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Unsubscribe from changes
    unsubscribe();
    console.log("Unsubscribed from state changes");

    // Test complex state
    console.log("\n4. Testing complex state...");
    const todoState = rykit.createState({
      todos: [],
      filter: "all",
      stats: {
        total: 0,
        completed: 0,
        pending: 0,
      },
    });

    // Add todo
    const addTodo = (text) => {
      todoState.setState((prev) => ({
        ...prev,
        todos: [
          ...prev.todos,
          {
            id: Date.now(),
            text,
            completed: false,
          },
        ],
        stats: {
          ...prev.stats,
          total: prev.stats.total + 1,
          pending: prev.stats.pending + 1,
        },
      }));
    };

    // Toggle todo
    const toggleTodo = (id) => {
      todoState.setState((prev) => {
        const newTodos = prev.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        const completed = newTodos.filter((todo) => todo.completed).length;
        return {
          ...prev,
          todos: newTodos,
          stats: {
            ...prev.stats,
            completed,
            pending: prev.stats.total - completed,
          },
        };
      });
    };

    // Test todo operations
    console.log("\nInitial todo state:", todoState.getState());

    addTodo("Learn RyKit");
    addTodo("Write tests");
    addTodo("Update documentation");
    console.log("\nAfter adding todos:", todoState.getState());

    toggleTodo(todoState.getState().todos[0].id);
    toggleTodo(todoState.getState().todos[1].id);
    console.log("\nAfter toggling todos:", todoState.getState());

    // Test state persistence
    console.log("\n5. Testing state persistence...");
    const persistentState = rykit.createState(
      {
        settings: {
          theme: "light",
          language: "en",
          notifications: true,
        },
      },
      {
        persist: true,
        key: "app-settings",
      }
    );

    console.log("Initial persistent state:", persistentState.getState());

    // Update settings
    persistentState.setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: "dark",
        language: "tr",
      },
    }));

    console.log("Updated persistent state:", persistentState.getState());
    console.log("State will be persisted and available after page reload");
  } catch (error) {
    console.error("State Test Error:", error.message);
  }
}

// Run state tests
testStateOperations();
