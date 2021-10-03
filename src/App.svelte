<script lang="ts">
  let title: string = "togami2864 (Yoshiaki Togami)";
  let url: string = "https://github.com/togami2864";
  const queryOptions = {
    active: true,
    currentWindow: true,
  };
  // chrome.tabs.query(queryOptions, (tabs) => {
  //   const currentTab = tabs[0];
  //   title = currentTab.title;
  //   url = currentTab.url;
  // });
</script>

<main>
  <input value={title} />
  <h2>{url}</h2>
  <textarea placeholder="メモ" />
  <select>
    <option>public</option>
    <option>private</option>
  </select>
  <button>Add</button>
  <button>Discard</button>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 480px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
