defmodule GenEditor.SmartCell do
  use Kino.JS
  use Kino.JS.Live
  use Kino.SmartCell, name: "Test_Print"

  @impl true
  def init(attrs, ctx) do
    ctx = assign(ctx, text: attrs["text"] || "")
    {:ok, ctx}
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, %{text: ctx.assigns.text}, ctx}
  end

  @impl true
  def handle_event("update_text", text, ctx) do
    broadcast_event(ctx, "update_text", text)
    {:noreply, assign(ctx, text: text)}
  end

  @impl true
  def to_attrs(ctx) do
    %{"text" => ctx.assigns.text}
  end

  @impl true
  def to_source(attrs) do
    quote do
      IO.puts(unquote(attrs["text"]))
    end
    |> Kino.SmartCell.quoted_to_string()
  end

  asset "main.js" do
    """
    export function init(ctx, payload) {
      root.innerHTML = `
        <div>Say what?</div>
        <input type="text" id="text" />
      `;

      const textEl = document.getElementById("text");
      textEl.value = payload.text;

      ctx.handleEvent("update_text", (text) => {
        textEl.value = text;
      });

      textEl.addEventListener("change", (event) => {
        ctx.pushEvent("update_text", event.target.value);
      });

      ctx.handleSync(() => {
        // Synchronously invokes change listeners
        document.activeElement &&
          document.activeElement.dispatchEvent(new Event("change"));
      });
    }
    """
  end
end
