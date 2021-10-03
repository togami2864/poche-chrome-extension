<script lang="ts">
  import { FormGroup, Input, Label, Button, Alert } from "sveltestrap";
  import { CustomError } from "./error";
  let title: string = "";
  let url: string = "";
  let memo: string = "";
  let tags: string[] = [];
  let isPrivate: boolean = false;

  let isSuccessVisible = false;
  let isDangerVisible = false;
  let errorStatus: number;

  const queryOptions = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryOptions, (tabs) => {
    const currentTab = tabs[0];
    title = currentTab.title;
    url = currentTab.url;
  });

  const handleSubmit = async () => {
    const payload = {
      title,
      url,
      memo,
      tags,
      isPrivate,
    };
    await fetch(process.env.API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      mode: "cors",
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          isDangerVisible = true;
          throw new CustomError(`${res.status}: Error`, res.status);
        }
        isSuccessVisible = true;
      })
      .catch((e) => {
        errorStatus = e.status;
        isDangerVisible = true;
        console.error(e);
      });
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
  <form on:submit|preventDefault={handleSubmit}>
    <Alert
      color="success"
      isOpen={isSuccessVisible}
      toggle={() => (isSuccessVisible = false)}
    >
      <h4 class="alert-heading text-capitalize">success</h4>
      save the data correctlly!
    </Alert>
    <Alert
      color="danger"
      isOpen={isDangerVisible}
      toggle={() => (isDangerVisible = false)}
    >
      <h4 class="alert-heading text-capitalize">{errorStatus}:Upps!</h4>
      Error occured!!
    </Alert>
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
      <Input
        type="textarea"
        name="memo"
        id="memo"
        placeholder="memo"
        bind:value={memo}
      />
    </FormGroup>
    <FormGroup>
      <Label for="isPrivate">privacy</Label>
      <select name="select" id="isPrivate" bind:value={isPrivate}>
        <option value={false} selected>public</option>
        <option value={true}>private</option>
      </select>
    </FormGroup>
    <Button color="danger" on:click={handleClose}>Discard</Button>
    <Button color="primary" type="submit">Add</Button>
  </form>
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
