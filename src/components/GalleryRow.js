function GalleryRow({ gallery }) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "10px" }}>
          <img src={gallery.image_url} width="100" alt="Movie cover" />
        </div>
        <div style={{ padding: "10px" }}>{gallery.name}</div>
        <div style={{ padding: "10px" }}>{gallery.description}</div>
      </div>
    );
  }