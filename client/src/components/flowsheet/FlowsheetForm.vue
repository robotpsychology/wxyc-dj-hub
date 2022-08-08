<template>
  <form action="" @submit.prevent="playcutCreate" method="post">
    <SelectButton
      id="entryType"
      v-model="playcutType"
      :options="playcutOptions"
    />

    <!-- Searches WXYC Library -->

    <div v-if="playcutType !== 'Rotation'" id="playcutForm">
      <AutoComplete
        class="inputSearch"
        id="release"
        v-model="releaseSelected"
        :suggestions="filteredReleases"
        @complete="[search($event)]"
        @item-select="releaseSelect($event)"
        placeholder="Release"
        field="releaseTitle"
        required
      >
      </AutoComplete>

      <AutoComplete
        class="inputSearch"
        id="artist"
        v-model="artistSelected"
        :suggestions="filteredArtists"
        @complete="search($event)"
        @item-select="artistSelect($event)"
        placeholder="Artist"
        field="artistName"
        required
      >
      </AutoComplete>

      <AutoComplete
        class="inputSearch"
        id="song"
        v-model="songSelected"
        placeholder="Song"
        field="songTitle"
        required
      >
      </AutoComplete>
      <!-- for songs
    :suggestions="filteredSongs"
    @complete="[search($event)]" 
    @item-select="songSelect($event)" 
      forceSelection
    -->

      <AutoComplete
        class="inputSearch"
        id="label"
        v-model="labelSelected"
        :suggestions="filteredLabels"
        @complete="searchLabel($event)"
        @item-select="labelSelect($event)"
        placeholder="Label"
        field="labelName"
        required
      >
      </AutoComplete>

      <span id="requestCheck">
        <label for="request">Request</label>
        <Checkbox
          name="request"
          value="Request"
          v-model="requestSelected"
          binary
        />
      </span>

      <span id="rotationCheck">
        <label for="rotation">Rotation</label>
        <Checkbox
          name="rotation"
          value="rotation"
          v-model="rotationSelected"
          binary
        />
      </span>
    </div>

    <!-- Searches Rotation DB -->
    <div v-if="playcutType == 'Rotation'" id="playcutForm">
      <SelectButton
        id="rotationType"
        v-model="rotationType"
        :options="rotationOptions"
        @change="rotationSelected = false"
      />

      <AutoComplete
        id="rotation"
        class="inputSearch"
        v-model="rotationSelected"
        :suggestions="filteredRotation"
        @complete="search($event)"
        @dropdown-click="rotationDropdown($event)"
        :dropdown="true"
        placeholder="Search Rotation"
        forceSelection
        required
      >
        <template #item="slotProps">
          <div class="country-item">
            <div class="ml-2">
              <i class="pi pi-palette"></i> {{ slotProps.item }}
            </div>
          </div>
        </template>
      </AutoComplete>
    </div>

    <br />
    <Button type="submit" value="submit" label="Submit"></Button>
  </form>
</template>

<script>
import LibraryService from "../../services/LibraryService";
import demoLibrary from "../../../public/data/demoLibrary.json";

export default {
  name: "FlowsheetForm",
  components: {},
  data() {
    return {
      playcutType: "WXYC Library",
      playcutOptions: ["WXYC Library", "Rotation", "Other"],
      rotationType: "Heavy",
      rotationOptions: ["Heavy", "Medium", "Light", "Single"],
      rotationSelected: false,
      requestSelected: false,
      artistSelected: null,
      songSelected: null,
      releaseSelected: null,
      labelSelected: null,
      filteredRotation: null,
      filteredArtists: null,
      filteredSongs: null,
      filteredReleases: null,
      filteredLabels: null,
      library: demoLibrary.data,
      rotationDB: {
        heavy: [],
        medium: [],
        light: [],
        single: [],
      },
      createdList: document.querySelectorAll(".p-autocomplete-item"),
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    search(event) {
      let eventID = event.originalEvent.target.id;
      console.log(event);

      if (eventID == "rotation") {
        this.searchRotation(event);
      } else if (eventID == "artist") {
        this.searchArtist(event);
      } else if (eventID == "song") {
        this.searchSong(event);
      } else if (eventID == "release") {
        this.searchRelease(event);
      }
    },
    demoRotationDB() {
      this.rotationDB.heavy = [];
      this.rotationDB.medium = [];
      this.rotationDB.light = [];
      this.rotationDB.single = [];

      for (let i = 0; i < this.library.length; i++) {
        let entry = this.library[i];
        let entry_string = `${entry.artistName} - ${entry.songTitle} - ${entry.releaseTitle}`;

        if (i <= 30) {
          this.rotationDB.heavy.push(entry_string);
        } else if (i > 30 && i <= 45) {
          this.rotationDB.medium.push(entry_string);
        } else if (i > 45 && i <= 55) {
          this.rotationDB.light.push(entry_string);
        } else if (i > 55 && i <= 65) {
          this.rotationDB.single.push(entry_string);
        }
      }
    },
    searchRotation(event) {
      this.demoRotationDB();

      let rotationSelected = this.rotationType.toLowerCase();

      this.filteredRotation = this.rotationDB[rotationSelected].filter(
        (entry) => {
          return entry.toLowerCase().includes(event.query.toLowerCase());
        }
      );
    },
    /**
     *
     * @param {*} event - example event doc
     */
    rotationDropdown(event) {
      this.demoRotationDB();

      let rotationSelected = this.rotationType.toLowerCase();
      console.log(event.query);

      this.filteredRotation = this.rotationDB[rotationSelected].filter(
        (entry) => {
          return entry.toLowerCase().includes(event.query.toLowerCase());
        }
      );
    },
    searchArtist(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredArtists = [...this.library.artistName];
        } else {
          this.filteredArtists = this.library.filter((entry) => {
            return entry.artistName
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }
      }, 250);
    },
    searchSong(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredSongs = [...this.library.songTitle];
        } else {
          this.filteredSongs = this.library.filter((entry) => {
            return entry.songTitle
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });

          let filteredSongsCopy = this.filteredSongs;
          let globalScope = this;

          document.addEventListener("mouseover", function (e) {
            if (e.target.className == "p-autocomplete-item") {
              for (let i = 0; i < filteredSongsCopy.length; i++) {
                if (e.target.innerText == filteredSongsCopy[i].songTitle) {
                  globalScope.artistSelected = filteredSongsCopy[i].artistName;
                  globalScope.songSelected = filteredSongsCopy[i].songTitle;
                  globalScope.releaseSelected =
                    filteredSongsCopy[i].releaseTitle;
                  globalScope.labelSelected = filteredSongsCopy[i].labelName;
                }
              }
            }
          });
        }
      }, 250);
    },
    searchRelease(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredReleases = [...this.library.releaseTitle];
        } else {
          this.filteredReleases = this.library.filter((entry) => {
            return entry.releaseTitle
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });

          let filteredReleasesCopy = this.filteredReleases;
          let globalScope = this;

          document.addEventListener("mouseover", function (e) {
            if (e.target.className == "p-autocomplete-item") {
              for (let i = 0; i < filteredReleasesCopy.length; i++) {
                if (
                  e.target.innerText == filteredReleasesCopy[i].releaseTitle
                ) {
                  globalScope.artistSelected =
                    filteredReleasesCopy[i].artistName;
                  globalScope.releaseSelected =
                    filteredReleasesCopy[i].releaseTitle;
                  globalScope.labelSelected = filteredReleasesCopy[i].labelName;
                }
              }
            }
          });
        }
      }, 250);
    },
    artistSelect(event) {
      this.songSelected = null;
      this.releaseSelected = null;
      this.labelSelected = null;
    },
    releaseSelect(event) {
      this.artistSelected = event.value.artistName;
      this.releaseSelected = event.value.releaseTitle;
      this.labelSelected = event.value.labelName;
    },
    songSelect(event) {
      this.artistSelected = event.value.artistName;
      this.releaseSelected = event.value.releaseTitle;
      this.labelSelected = event.value.labelName;
      console.log(event.value.songTitle);
    },
    // new stuff
    async playcutCreate() {
      const payload = {
        rotation: this.rotationSelected,
        request: this.requestSelected,
        song_title: this.songSelected,
        label_name: this.labelSelected,
        artist_name: this.artistSelected,
        release_title: this.releaseSelected,
        entry_type: "playcut",
      };

      this.$emit("createPlaycut", payload);

      this.clearForm();
    },
    clearForm() {
      this.requestSelected = false;
      this.rotationSelected = false;
      this.songSelected = "";
      this.labelSelected = "";
      this.artistSelected = "";
      this.releaseSelected = "";
    },
  },
};
</script>

<style>
#playcutForm {
}

#entryType {
  margin: 15px;
}

.inputSearch input {
  background-image: url("../../../node_modules/primeicons/raw-svg/search.svg");
  background-size: 0.8em;
  background-position: left;
  background-repeat: no-repeat;
  text-indent: 20px;
}

#artist {
  background-image: url("../../../node_modules/primeicons/raw-svg/user.svg");
}

#song {
  background-image: url("../../../node_modules/primeicons/raw-svg/sun.svg");
}

#release {
  background-image: url("../../../node_modules/primeicons/raw-svg/moon.svg");
}

#label {
  background-image: url("../../../node_modules/primeicons/raw-svg/box.svg");
}
</style>
