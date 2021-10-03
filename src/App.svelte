<script lang="ts">
  import { Form, FormGroup, Input, Label, Button } from "sveltestrap";
  let title: string = "";
  let url: string = "";
  const queryOptions = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(queryOptions, (tabs) => {
    const currentTab = tabs[0];
    title = currentTab.title;
    url = currentTab.url;
  });

  const handleClick = () => {
    console.log("ok");
  };

  const handleClose = () => {
    window.close();
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
  />
</svelte:head>

<main>
  <Form>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input id="title" value={title} />
    </FormGroup>
    <FormGroup>
      <Label for="title">URL</Label>
      <Input plaintext id="title" value={url} readonly disabled />
    </FormGroup>
    <FormGroup>
      <Label for="memo">Memo</Label>
      <Input type="textarea" name="memo" id="memo" placeholder="memo" />
    </FormGroup>
    <FormGroup>
      <Label for="isPrivate">privacy</Label>
      <select name="select" id="isPrivate">
        <option value={false} selected>public</option>
        <option value={true}>private</option>
      </select>
    </FormGroup>
    <Button color="danger" on:click={handleClose}>Discard</Button>
    <Button color="primary" on:click={handleClick}>Add</Button>
  </Form>
</main>

<style>
  main {
    text-align: left;
    padding: 1em;
    min-width: 480px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
