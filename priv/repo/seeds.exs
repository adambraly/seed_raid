# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     SeedRaid.Repo.insert!(%SeedRaid.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

blacklist = [
  392_747_598_257_061_888,
  391_274_542_607_237_124,
  390_962_704_116_088_832,
  411_785_159_759_757_312,
  359_632_426_869_325_825,
  363_452_454_001_704_960,
  391_367_624_996_552_708,
  392_406_113_762_410_502,
  393_500_511_191_564_299,
  364_289_848_192_008_192,
  390_269_549_804_519_424,
  292_692_038_254_592_000,
  390_208_191_176_114_179,
  390_156_141_964_820_480,
  362_539_660_322_406_401
]

blacklist
|> Enum.each(fn id ->
  case SeedRaid.Pin.is_blacklisted?(%{id: id}) do
    false ->
      SeedRaid.Pin.add_to_blacklist(id)

    true ->
      :noop
  end
end)
